import { Router, Request, Response, NextFunction } from "express";
import { ErrorResponse, SuccessResponse } from "../helpers/Response";
import { JobsService } from "../services/JobService";
import { getJobDetails } from "../validators/validateor";
import { validationResult } from "express-validator";

const JobController: Router = Router();
/**
 * Get job Details API
 */
JobController.get("/job-details", getJobDetails(), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        const { department } = request.query;
        const jobService = new JobsService();
        const data = await jobService.getJobs(department as string)
        if (data.length === 0) {
            throw new ErrorResponse(400, "No department found!")
        }
        response.status(200).send(new SuccessResponse(200, "Data Found", data))
    } catch (error: any) {
        response.status(400).send(new ErrorResponse(400, error?.message))
    }
})
export default JobController;