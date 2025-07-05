export interface DashboardSummary {
  totalExpenses: number;
  categoryBreakdown: Record<string, number>;
  recentTransactions: {
    _id: string;
    amount: number;
    description: string;
    date: string;
    category: string;
  }[];
}
