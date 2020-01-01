export const getSummary = (state) => {
    let s = state.summary;
    if (s) {
        if (!s.totalUsers) {
            s.totalUsers = 0;
        }
        if (!s.aliveUsers) {
            s.aliveUsers = 0;
        }
        if (!s.totalDevices) {
            s.totalDevices = 0;
        }
        if (!s.totalAccounts) {
            s.totalAccounts = 0;
        }
        if (!s.errorText) {
            s.errorText = "";
        }
    }
    return s || null;
}
