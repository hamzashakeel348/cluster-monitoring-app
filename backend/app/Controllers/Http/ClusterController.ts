import Logger from "@ioc:Adonis/Core/Logger";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import ClusterService from "App/Services/ClusterService";

export default class ClusterController {
  public async createCluster({ request, response }: HttpContextContract) {
    try {
      const clusterData = request.only(["name", "timeSeries"]);
      const cluster = await ClusterService.createCluster(clusterData);
      return response.created(cluster);
    } catch (error) {
      Logger.error("Error creating cluster: %j", error);
      return response.badRequest({
        error: error.message || "Failed to create cluster",
      });
    }
  }

  public async getTimeSeries({ params, response }: HttpContextContract) {
    try {
      const result = await ClusterService.getTimeSeries(params.id);
      return response.ok(result);
    } catch (error) {
      Logger.error("Error retrieving time series data: %j", error);
      return response.internalServerError({
        error: error.message || "Failed to retrieve time series data",
      });
    }
  }
}
