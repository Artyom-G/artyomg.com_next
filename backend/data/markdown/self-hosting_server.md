<title>Self-Hosting Server (Proxmox Homelab) | Portfolio of Artyom Gabtraupov</title>

# Project Overview

A self-hosted virtualization homelab on a small-form-factor PC, built to host my websites, a NAS, and a media server. Public traffic reaches the web server through a **Cloudflare Tunnel**, which needs no inbound port forwarding on the home router, and private access goes through **Tailscale**. Two Debian VMs run on a **Proxmox VE** host: one for web hosting and one for storage and media. In fact, the site you are reading right now is served from it.

This is a personal homelab, not production infrastructure. The goal was to learn virtualization, Linux administration and network security by running real services end to end, and documenting every decision along the way.

# Architecture

```
Internet ──▶ Cloudflare (HTTPS) ──▶ Cloudflare Tunnel (outbound only) ──▶ Web Server VM ──▶ Caddy ──▶ static sites

Remote devices ──▶ Tailscale (WireGuard) ──▶ NAS & Media VM ──▶ Samba / Jellyfin
                                                    │
                                                    └──▶ SSH jump host to the rest of the LAN
```

# Technologies Used

**Proxmox VE (KVM / QEMU)**: Hypervisor running the whole lab.  
**Debian 13**: Guest OS for both virtual machines.  
**Caddy**: Web server serving the static websites.  
**Cloudflare Tunnel**: Public access to the websites with no open inbound ports.  
**Tailscale (WireGuard)**: Private, encrypted remote access.  
**Samba & Jellyfin**: Network file shares and media streaming.  
**systemd, fstab, ACLs**: Service management, boot-safe mounts and file permissions.

# The Hardware

- **System**: Lenovo ThinkCentre M75s SFF
- **CPU**: AMD Ryzen 5 PRO 3400G (4 cores / 8 threads)
- **GPU**: AMD Radeon Vega 11 (integrated)
- **RAM**: 16 GB DDR4
- **Boot storage**: 256 GB SATA SSD
- **Bulk storage**: 4 TB external HDD, passed through to the NAS VM over USB
- **Network**: Gigabit Ethernet

# Proxmox Host

The host is purely a virtualization layer: applications run inside VMs, never directly on Proxmox, so the host stays reachable on the local network even when a VM or service is down. Both VMs sit on a shared bridged network, and the NAS VM starts automatically with the host.

**Security by design**: Public websites are only reachable through Cloudflare Tunnel, where the server makes an outbound connection to Cloudflare and hostnames are mapped to local services. Admin interfaces (the Proxmox web UI, SSH and SMB) are never exposed to the internet and are only reachable on the LAN or over Tailscale.

**Jump host over subnet router**: I weighed a Tailscale subnet router against using one VM as an SSH jump host. I chose the jump host to keep the exposed surface small: only one machine joins the tailnet, and everything else on the LAN is reached by hopping through it.

**GPU passthrough experiment (shelved)**: I tried passing the integrated Vega 11 GPU into a VM for hardware video transcoding. I got through VFIO binding and IOMMU configuration, then hit two walls: the guest `amdgpu` driver couldn't locate a GPU BIOS ROM, and the host logged IOMMU timeouts. I decided to stop there rather than sink more time into it. The more promising route is an LXC container that shares the host GPU without VFIO.

# Web Server VM

A Debian VM that hosts my public websites, deployed straight from Git.

- **Static-first**: Sites like this one are Next.js static exports served by **Caddy**, which keeps the VM light and the attack surface small.
- **Tunnel-based routing**: `cloudflared` runs as a systemd service and maps each public hostname to the local Caddy origin. Cloudflare terminates HTTPS, and the hop from the tunnel to Caddy never leaves the machine. Adding a site means adding a Caddy block and a tunnel route, with no changes to the home network.
- **Git-based deploys**: Each site lives in its own repository on the server. Deploying is a `git pull` followed by a rebuild, and Caddy serves the fresh build output.
- **Least-privilege file access**: Caddy runs as its own service user. Instead of changing ownership of the project folders, I used **ACLs** to give it just enough permission to traverse the directories and read the built files.

# NAS & Media VM

A Debian VM (2 vCPUs, 4 GB RAM) serving network file shares and a media server from the 4 TB drive.

- **Samba** provides the file shares, organized into files, photos, music, movies and TV.
- **Jellyfin** streams the movie and TV libraries, at home over the LAN and remotely over Tailscale.
- **Remote streaming performance**: I diagnosed slow remote playback by separating transcoding (CPU-bound) from direct play (network-bound), comparing home upload bandwidth to file bitrates, and checking whether Tailscale was using a direct connection or a relay. Since transcoding runs on the CPU with no GPU acceleration, direct play is preferred.

# Debugging Story: The "Network Problem" That Wasn't

After the GPU experiments, the NAS VM showed as *running* in Proxmox but was completely unreachable. Instead of changing settings at random, I worked through it layer by layer:

1. Confirmed the QEMU process was alive.
2. Checked the virtual NIC and the bridge.
3. The serial console was blank (the guest isn't configured for serial output), so I took a screenshot of the VM's display through the **QEMU monitor**.

The screenshot showed the guest stuck in **systemd emergency mode**. `/etc/fstab` hard-required the USB drive, which I had detached during the GPU work, and emergency mode never brings up networking. The "network problem" was really a mount dependency.

The fix was adding `nofail` and a device timeout to the mount, so a missing drive can no longer block boot or take the network down with it. I also documented the recovery steps so the next outage takes minutes, not hours.

**Lesson**: a symptom at one layer can have its cause at a completely different one.

# Documentation

Every VM has its own README covering its purpose, configuration, known-good baseline, useful commands and troubleshooting steps, so the setup can be understood and rebuilt without relying on memory.

# What I'd Improve Next

- **Backups** of the VM disks and the 4 TB drive.
- **GPU transcoding** through an LXC container instead of VFIO passthrough.
- **Tailscale ACLs and node sharing** to give guests limited access to Jellyfin without exposing the rest of the network.
- **Monitoring and alerting** for the host, VMs and services.
