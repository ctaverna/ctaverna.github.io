---
title: "IoT services"
subtitle: "IoT managed services for IoT solutions"
is-folder: false
subcategory: "other-services"
sequence: 2
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [IoT services](#iot-services)
  - [IoT ExpressLink](#iot-expresslink)
  - [FreeRTOS](#freertos)
  - [IoT Greengrass](#iot-greengrass)
  - [IoT Core](#iot-core)
  - [IoT Analytics](#iot-analytics)
  - [IoT Events](#iot-events)
  - [IoT SiteWise](#iot-sitewise)
  - [IoT TwinMaker](#iot-twinmaker)


# IoT services

## IoT ExpressLink

A range of hardware modules developed and offered by AWS Partners, such as Espressif, Infineon, and u-blox, with mandated security requirements, making it faster and easier for you to securely connect devices to the cloud and seamlessly integrate with a range of AWS services.

It's a library made available to developers that can be used through AT commands.

## FreeRTOS

FreeRTOS is an open-source, cloud-neutral real-time operating system that offers a fast, dependable, and responsive kernel. FreeRTOS is implemented in over 40 architectures, providing developers with a broad choice of hardware along with a set of prepackaged software libraries.

On this OS is available as a library to use AWS services.

## IoT Greengrass

AWS IoT Greengrass is an open-source edge runtime and cloud service for building, deploying, and managing device software.

**Run at the edge M**akes it easy to bring intelligence to edge devices.\
**Manage apps** Deploy new or legacy apps across fleets using any language, packaging technology, or runtime.\
**Control fleets** Manage and operate device fleets in the field locally or remotely using MQTT or other protocols.\
**Process locally** Collect, aggregate, filter, and send data locally. Manage and control what data goes to the cloud for optimized analytics and storage.

## IoT Core

It's simply the Amazon's MQTT broker, almost-standard, with some limit.

Port is not standard and encryption is mandatory.

* ALPN Protocol
* Recently, loading your protocols it is possible to call the MQTT broker using your custom domain name
* Logs can be sent to CloudWatch
* Events can be used as triggers for publications
* The client MUST have a client certificate

## IoT Analytics

It's a tool to run analytics on IoT data, that can collect, process and store data in a time-series store.

It can be then used to collect data, transform it and bring it to BI tools.

## IoT Events

Handle events and apply conditional logic and produce side effects using alarms and actions.

## IoT SiteWise

Service that leveraging GreenGrass devices enables functionalities at the edge, mainly for industrial equipment.

## IoT TwinMaker

Service that makes easier to create digital twins.
