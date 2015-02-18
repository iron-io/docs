---
title: IronMQ v3.0 changelog
summary: "Our IronMQ engineers will be updating this page with the latest major and minor changes to the api and behavior"
layout: default
section: mq-v3
---
<p class="subtitle">

</p>

<h2>Changelog</h2>

### 3.1.10 Feb 9, 2015 (proposed)
      - peek with reserved to api
      - new stats infrastructure
      - rebalancer
      - membership report in http
      - permanent quorum member removal
      - performance and correctness enhancements to queue occupancy counts
      - distinguish various reservation error cases in the result code

### 3.1.9  Jan 19, 2015
      - fix to lock free queue head
      - queue distribution map export to http

### 3.1.8  Jan 12, 2015
      - decouple locks from enqeue and dequeue path
      - push queue support for cluster
      - push queue rate limits
      - historical per-project usage counts
      - sqs support