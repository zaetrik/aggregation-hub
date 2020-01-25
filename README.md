# Aggregation Hub

A platform to aggregate data from all kinds of different sources.

![Aggregation Hub Gif](./assets/aggregationhub.gif)
![Aggregation Hub Module Overview](./assets/module-overview.png)

## How does Aggregation Hub work?

Aggregation Hub works with modules. A module is a standalone application/server that extracts data from a data source (e.g. CSV files, web sites, APIs, databases, etc.). The extracted data is then stored in a database (currently Elasticsearch) for easy access and visualizations (currently possible with Kibana).

This module system makes it possible to create a new module with any programming language that is capable of creating a HTTP API. It also allows the user to add modules that are not hosted by himself.

You can define jobs for each module. You can set an interval for the data aggregation and start or stop the job execution.

The user can also set settings for a module, e.g. the Google Search Results Module has a setting for the search queries for which the module should aggregate data.

## Usage

Prerequisites:

You need to set the environment variables in multiple locations. Example files are included where it is necessary to set those variables.
You also need Docker Compose on your machine.

To start the development environment you need to run `sh start_services.sh`

## Disclaimer

Aggregation Hub is in semi active development and is not ready for usage yet.
