export interface DataProvider {
  getDashboard(): Promise<unknown>;
  getAnalyses(): Promise<unknown>;
  getAnalysis(id: string): Promise<unknown>;
}
