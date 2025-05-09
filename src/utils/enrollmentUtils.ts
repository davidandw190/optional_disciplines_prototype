export const completedEnrollmentsUtils = {
  STORAGE_KEY: 'completed-enrollments',

  getCompletedEnrollments(): string[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving completed enrollments:', error);
      return [];
    }
  },

  markEnrollmentCompleted(periodId: string): void {
    try {
      const completed = this.getCompletedEnrollments();
      if (!completed.includes(periodId)) {
        completed.push(periodId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(completed));
      }
    } catch (error) {
      console.error('Error marking enrollment as completed:', error);
    }
  },

  isEnrollmentCompleted(periodId: string): boolean {
    return this.getCompletedEnrollments().includes(periodId);
  },

  clearCompletedEnrollments(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  },
};
