import Logger from "@ioc:Adonis/Core/Logger";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import SnapshotPolicyService from "App/Services/SnapshotPolicyService";

export default class SnapshotPolicyController {
  public async createSnapshotPolicy({
    params,
    request,
    response,
  }: HttpContextContract) {
    try {
      const clusterId = params.id;
      const policyData = request.only([
        "policyName",
        "directoryPath",
        "schedule",
        "deletePolicy",
        "snapshotLocking",
        "enablePolicy",
      ]);

      const snapshotPolicy = await SnapshotPolicyService.createSnapshotPolicy(
        clusterId,
        policyData
      );
      return response.created(snapshotPolicy);
    } catch (error) {
      Logger.error("Error creating snapshot policy: %j", error);
      return response.internalServerError({
        error: error.message || "Failed to create snapshot policy",
      });
    }
  }

  public async getSnapshotPolicy({ params, response }: HttpContextContract) {
    try {
      const snapshotPolicy = await SnapshotPolicyService.getSnapshotPolicy(
        params.id
      );
      return response.ok(snapshotPolicy);
    } catch (error) {
      Logger.error("Error retrieving snapshot policy: %j", error);
      return response.internalServerError({
        error: error.message || "Failed to retrieve snapshot policy",
      });
    }
  }

  public async updateSnapshotPolicy({
    params,
    request,
    response,
  }: HttpContextContract) {
    try {
      const policyData = request.only([
        "policyName",
        "directoryPath",
        "schedule",
        "deletePolicy",
        "snapshotLocking",
        "enablePolicy",
      ]);

      const updatedSnapshotPolicy =
        await SnapshotPolicyService.updateSnapshotPolicy(params.id, policyData);
      return response.ok(updatedSnapshotPolicy);
    } catch (error) {
      Logger.error("Error updating snapshot policy: %j", error);
      return response.internalServerError({
        error:
          error.message || "An error occurred while updating snapshot policy",
      });
    }
  }
}
