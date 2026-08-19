import { analysesMock } from '../mocks/analyses';
import { dashboardOverviewMock } from '../mocks/dashboard-overview';

export class DemoProvider {
  async getDashboard() {
    return dashboardOverviewMock;
  }

  async getAnalyses() {
    return analysesMock;
  }

  async getAnalysis(id: string) {
    return analysesMock.find((analysis) => analysis.id === id);
  }
}
