#!/usr/bin/env python3
"""
Simple TCP port scanner (provided by user).
Use responsibly and only against systems you are authorized to test.
"""
import socket


def get_local_ip():
    # Gets the hostname of your computer
    hostname = socket.gethostname()
    # Resolves the hostname to the local IPv4 address
    local_ip = socket.gethostbyname(hostname)
    return local_ip


def scan_ports(target):
    print(f"Starting scan on: {target}")
    # Scanning a small range for a quick test
    for port in range(1, 1025):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.01)  # Very fast timeout for local scanning
        result = s.connect_ex((target, port))
        if result == 0:
            print(f"Port {port} is OPEN")
        s.close()


if __name__ == '__main__':
    # 1. Automatically detect the IP
    my_ip = get_local_ip()
    print(f"Detected Local IP: {my_ip}")

    # 2. Run the scanner using the detected IP
    scan_ports(my_ip)
