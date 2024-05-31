- [Amazon Virtual Private Cloud (VPC)](#amazon-virtual-private-cloud-vpc)
	- [IP Addressing](#ip-addressing)
		- [CIDR Examples](#cidr-examples)
			- [How many IPs](#how-many-ips)
	- [Subnets](#subnets)
	- [Route tables](#route-tables)
		- [Public subnets](#public-subnets)
		- [Private subnets](#private-subnets)
	- [Internet gateway](#internet-gateway)
		- [Route table example](#route-table-example)
	- [NAT Gateway](#nat-gateway)
		- [Connectivity types](#connectivity-types)
		- [Route table example](#route-table-example)
	- [NAT Instance](#nat-instance)
	- [Elastic Network Interface](#elastic-network-interface)
	- [IPv6 Addresses](#ipv6-addresses)
	- [Elastic IP Address](#elastic-ip-address)
	- [Security Groups](#security-groups)
	- [Network Access Control Lists (ACLs)](#network-access-control-lists-acls)
	- [Virtual Private Gateway (VGW)](#virtual-private-gateway-vgw)
	- [VPC Peering connection](#vpc-peering-connection)
	- [VPC Endpoint](#vpc-endpoint)
	- [VPC Flow Logs](#vpc-flow-logs)
- [AWS Direct Connect (DX)](#aws-direct-connect-dx)
- [Transit Gateway](#transit-gateway)


![service-logo](/assets/img/aws-icons/Arch_Amazon-Virtual-Private-Cloud_64.png)
#  Amazon Virtual Private Cloud (VPC)

Amazon Virtual Private Cloud (Amazon VPC) is your network environment in the cloud.

- **Region** specific
- Max 5 VPC per region (per account)

One VPC
: Small applications managed by one person or a small team
: High performance computing
: Identity management

Multi-VPC pattern
: Single team or single organizations
: (ie: a single team with full access to DEV and PROD environments)

Multi-account pattern
: Large organizations with multiple teams
: (ie: developers with full access to DEV but limited or no access to PROD)

## IP Addressing

Each VPC reserves a **range** of private IP addresses, defined using Classless Inter-Domain Routing (**CIDR**).

Supports BYOIP (Bring your own IP).

### CIDR Examples

`0.0.0.0/0      -> All IPs`  
`10.22.33.44/32 -> 10.22.33.44` \
`10.22.33.0/24  -> 10.22.33.*` \
`10.22.0.0/16   -> 10.22.*.*`

#### How many IPs

/28 = 16  \
/27 = 32 ...\
/20 = 4.096 \
/19 = 8.192 \
/18 = 16.384 \
/17 = 32.768 ....

_It's **not possible to change or modify the IP address range** of an existing virtual private cloud (VPC) or subnet. However, you can add an additional IPv4 CIDR block as a secondary CIDR to your VPC, or create a new CPV and migrate your existing resources (if applicable)._

## Subnets

VPC subnets are mapped to **specific Availability Zones** and, therefore, subnet placement is one mechanism to ensure EC2 instances are properly distributed across multiple locations.

A subnet use CIDR to pick a block of IP which is a **subset** of the VPC CIDR block.

Reserved IPs in every subnet:

* X.0.0.0 - Network address
* X.0.0.1 - VPC router
* X.0.0.2 - DNS
* X.0.0.3 - Future uses
* X.0.0.255 - Broadcast address

A _subnet group_ is a collection of subnets (typically private) that you can designate for your clusters running in an Amazon Virtual Private Cloud (VPC) environment.

## Route tables

* Required to direct traffic between VPC resources
* Each VPC has a main route table (by default only a single route that enables local communication)
* You can create custom route tables
* All subnets MUST have an associated route table
* Best practice: use custom route tables for each subnet

### Public subnets

* Include a **routing table entry** to an **internet gateway** to support inbound/outbound access to public internet

### Private subnets

* **Do not have** a **routing table entry** to an **internet gateway**
* Are not directly accessible from the public internet
* Typically use a **NAT gateway** to support restricted, outbound public internet access



## Internet gateway

Allows communication between instances in your VPC and the internet.

* Highly available, redundant, horizontally scaled,
* Attached to a **VPC**
* Provides a target in your VPC route table for internet-routable traffic

### Route table example

VPC: 10.0.0.0/16\
Subnet: 10.0.10.0/24

| Destination | Target              | Description             |
| ----------- | ------------------- | ----------------------- |
| 10.0.0.0/16 | local               | Route local VPC traffic |
| 0.0.0.0/0   | internet-gateway-id | Internet traffic        |

## NAT Gateway

A NAT gateway is a Network Address Translation (NAT) managed service.

You can use a NAT gateway so that instances in a _private_ subnet can connect to services outside your VPC but external services cannot initiate a connection with those instances.

- Created in a **single AZ (Subnet)**\
  _If you have resources in multiple AZs and they share one NAT gateway, and if the NAT gateway’s AZ is down, resources in the other AZs lose internet access._
- Supports TCP, UDP, and ICMP
- Supports **5 Gbps** of bandwidth and automatically scales up to 100 Gbps.  
  If you require more bandwidth, you can split your resources into multiple subnets and create a NAT gateway in each subnet.
- Private IP address or Elastic IP address **cannot be detached**.
  To use a different IP you must create a new NAT gateway, update your route tables, and then delete the existing NAT gateway.

### Connectivity types

- **Public NAT Gatway** *(default)*
  *Instances in private subnets can connect to the internet through a public NAT gateway, but cannot receive unsolicited inbound connections from the internet.*
  - Located in a **public** subnet, associated with an **Elastic IP address**
  - It is possible to route traffic from NAT Gateway to
    - the Internet Gateway _OR_
    - other VPCs _OR_
    - your on-premises network
- **Private NAT Gateway**
  *Instances in private subnets can connect to other VPCs or your on-premises network through a private NAT gateway*
  - **Cannot have** an **Elastic IP address**
  - It is possible to route traffic from NAT Gateway to
    - a Transit Gateway
    - Virtual Private Gateway
    - If you route traffic from the private NAT gateway to the internet gateway, the internet gateway **drops** the traffic

### Route table example


`VPC: 10.0.0.0/16`  
`Subnet: 10.0.10.0/24`


| Destination | Target         | Description             |
| ----------- | -------------- | ----------------------- |
| 10.0.0.0/16 | local          | Route local VPC traffic |
| 0.0.0.0/0   | nat-gateway-id | Internet traffic        |

## NAT Instance

A NAT Instance is a NAT device on an EC2 instance.

It is recommended to use NAT gateways because they provide better availability and bandwidth and require less effort on your part to administer.

## Elastic Network Interface

- Virtual network interface that you can attach to an instance in a VPC.
- You can detach it from an instance, and attach it to another instance.
-The **attributes** of a network interface, including the private IP address, elastic IP address, and MAC address, **follow the network interface**, because it is attached to or detached from an instance and reattached to another instance. **When you move a network interface** from one instance to another, **network traffic is redirected to the new instance.**
- Each instance in a VPC has a default network interface (the primary network interface) that is assigned a private IP address from the IP address range of your VPC.
- **You cannot detach a primary network interface from an instance**. You can create and attach additional network interfaces.
- Attaching multiple network interfaces to an instance is useful when you want to:
  - Create a management network. (public for traffic, private for ssh management)
  - Use network and security appliances in your VPC.
  - Create dual-homed instances with workloads/roles on distinct subnets.
  - Create a low-budget, high-availability solution.
- You can attach a **network interface in one subnet to an instance in another subnet** in the same VPC; however, both the network interface and the instance **must reside in the same AZ.**

## IPv6 Addresses

When you enable IPv6 in your VPC, the network operates in dual-stack mode, meaning that IPv4 and IPv6 commutations are independent of each other.  
Your resources can communicate over **IPv4, IPv6, or both**.

## Elastic IP Address

- **Static, public** IP address (only IPv4, max 5 per region)
- Associated with an **instance** or a **network interface**
- Accessed through the **Internet Gateway** (so traffic through VPN cannot access the elastic ip address)

## Security Groups

- Virtual firewall for both **ingress and egress** traffic **to aws resources**
- **Allow outbound** and **deny inbound** traffic **by default**
- **Stateful**
- Traffic can be restricted by any IP protocol, by service port, as well as source/destination IP address (individual IP or CIDR block)
- Chaining example:
  - WebTier - Inbound rule allowing https (443) - Source 0.0.0.0./0
  - Application: Inbound rule allowing http (80) - Source WebTier
  - Database: Inbound rule allowing TCP (3306) - Source AppTier

## Network Access Control Lists (ACLs)

- Virtual firewalls at the **subnet** boundary
- **Allow all** inbound and outbound traffic **by default**
- **Stateless,** requiring **explicit** rules for both inbound and outbound traffic
- To be used mainly for standard compliance
- Best practice is to act it **redundantly with SG,** as a second layer of defense

## Virtual Private Gateway (VGW)

- Enables you to **establish private connections** (VPNs) **between a VPC and another network** (your own network).
- Hardware backed
- HA, active/passive mode on two tunnels (only one active), multiple DC
- Attached to a **VPC**
- Supports **multiple VPNs**
- As an alternative can be used an EC2 with a VPN software (not the best option)

## VPC Peering connection

- No hardware, no SPoF
- No bandwith bottleneck
- HA, redundant, horizontally scaled, no hardware
- No IGW or VGW required
- Associated to a **VPC**
- **Intra and inter region** support
- IP spaces **cannot overlap**
- **Only one peering** **resource** between any two VPCs
- Can be established between **different accounts**
  - Owner of requester (Local VPC) sends a **request**
  - The Peer VPC **accept** the request (no CIDR overlap)
  - Add a **route** in the **local VPC to peer VPC** address range
  - Add a **route** in the **peer VPC to local VPC** address range
- It's a **one-to-one** relationship, can't be transitive


## VPC Endpoint

- Enables a **private connection** between a **VPC** and another AWS **service in the same region**, without traversal over the internet or NAT, VPN or DX.
- HA, redundant, horizontally scaled, no hw
- Associated to a **VPC**
- Two types:
  - **Gateway endpoint**  
  supports **S3 and DynamoDB**, not billed, same DNS, associated at VPC level
  - **Interface endpoints**  
  supports **most AWS service**, billed, specific DNS, associated on subnet level  
  *it is an ENI attached with a SG*



## VPC Flow Logs

It's an option that can be used to **debug network traffic**.

For each network session, metadata such as the source, destination, protocol, port, packet count, byte count, and time interval is captured and saved into **CloudWatch** or **S3**.  
Each log entry specifies whether the traffic was **accepted** or **rejected**.




![service-logo](/assets/img/aws-icons/Arch_AWS-Direct-Connect_64.png)
# AWS Direct Connect (DX)

Service to establish a dedicated network connection from on-premises to AWS.
- Dedicated, private **network connection** of either 1 or 10 Gbps
- It is provisioned through partners
- Does not involve the internet; instead, it uses dedicated, private network connections between your on-premises solutions and AWS.
- Use cases:
  - Hybrid cloud architectures
  - Continous trasnferring of large datasets
  - Network performance predictability (real time apps)
  - Security and compliance
- VGW-------DX-------RemoteNetwork


![service-logo](/assets/img/aws-icons/Arch_AWS-Transit-Gateway_64.png)
# Transit Gateway

Enables customers to connect their VPCs and on-premises networks to a single gateway.
It significantly simplifies management and operational cost when it is needed to implement sophisticated network architectures.
- Connects up to **5.000 VPCs and on-premises environments** with a single gateway
- Acts as a hub for all traffic
- Fully managed, HA, flexible routing service
- Allows for multicast and inter-regional peering
- Each VPC route table:  
`Destination - target`  
`10.1.0.0/16 - local`    
`10.0.0.0/8 - tgw`
- Transit gateway route table:  
`Destination - target`    
`10.1.0.0/16 - vpc1`    
`10.2.0.0/16 - vpc2`  
`10.3.0.0/16 - vpc3`
