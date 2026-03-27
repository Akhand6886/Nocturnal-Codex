---
title: "Socket Programming"
description: "TCP/UDP client-server communication with Berkeley sockets"
---

## What Are Sockets?

Sockets are endpoints for network communication. They allow programs on different machines (or the same machine) to exchange data over TCP/IP or UDP.

## TCP Server — Step by Step

```c
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080

int main() {
    // 1. Create socket
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    
    // 2. Bind to address
    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_addr.s_addr = INADDR_ANY,
        .sin_port = htons(PORT)
    };
    bind(server_fd, (struct sockaddr*)&addr, sizeof(addr));
    
    // 3. Listen for connections
    listen(server_fd, 5);
    printf("Server listening on port %d...\n", PORT);
    
    // 4. Accept a connection
    int client_fd = accept(server_fd, NULL, NULL);
    
    // 5. Communicate
    char buffer[1024] = {0};
    read(client_fd, buffer, sizeof(buffer));
    printf("Received: %s\n", buffer);
    
    const char *response = "Hello from server!";
    write(client_fd, response, strlen(response));
    
    // 6. Close
    close(client_fd);
    close(server_fd);
    return 0;
}
```

## TCP Client

```c
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

int main() {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    
    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_port = htons(8080)
    };
    inet_pton(AF_INET, "127.0.0.1", &addr.sin_addr);
    
    connect(sock, (struct sockaddr*)&addr, sizeof(addr));
    
    const char *message = "Hello from client!";
    write(sock, message, strlen(message));
    
    char buffer[1024] = {0};
    read(sock, buffer, sizeof(buffer));
    printf("Server says: %s\n", buffer);
    
    close(sock);
    return 0;
}
```

## The Socket API Flow

```
SERVER                      CLIENT
socket()                    socket()
bind()                          |
listen()                        |
accept() <-- connection --> connect()
read/write <-> data <->    read/write
close()                     close()
```

## TCP vs UDP

| Feature | TCP (`SOCK_STREAM`) | UDP (`SOCK_DGRAM`) |
|---------|----|----|
| Connection | Yes | No |
| Reliability | Guaranteed delivery | Best effort |
| Order | Maintained | Not guaranteed |
| Speed | Slower | Faster |
| Use case | HTTP, SSH, databases | DNS, gaming, streaming |

## Summary

Socket programming is the foundation of all networked applications. TCP provides reliable, ordered data streams; UDP provides fast, connectionless communication.
