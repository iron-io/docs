---
title: IronMQ v3 changelog
summary: "Our IronMQ engineers will be updating this page with the latest major and minor changes to the api and behavior"
layout: default
section: mq-v3
---
<p class="subtitle">

</p>

<h2>Changelog</h2>

### 3.1.11 Feb 25, 2015
      - Added more useful logging information
      - Fixed rebalancer bugs

### 3.1.10 Feb 18, 2015
      - Added peek with reserved to api
      - Added rebalancer
      - Added membership report in http
      - Added permanent quorum member removal
      - Changed new stats infrastructure
      - Changed distinguish various reservation error cases in the result code
      - Fixed performance and correctness enhancements to queue occupancy counts
      - Fixed proxy no longer retries, fails nodes correctly
      - Fixed peek/deq return empty list instead of nil

### 3.1.9  Jan 19, 2015
      - Added queue distribution map export to http
      - Fixed lock free queue head panic

### 3.1.8  Jan 12, 2015
      - Added push queue support for cluster
      - Added push queue rate limits
      - Added historical per-project usage counts
      - Fixed sqs support
      - Changed decouple locks from enqeue and dequeue path
