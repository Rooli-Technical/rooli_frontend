import axiosInstance from "./axios-instance";

class BillingService {
  async getBillingPlans() {
    const response = await axiosInstance(true).get("/billing/plans");

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }
}

const billingService = new BillingService();

export default billingService;
