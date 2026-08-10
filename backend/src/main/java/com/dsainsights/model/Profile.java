package com.dsainsights.model;

import java.util.ArrayList;
import java.util.List;

public class Profile {

    private int totalSolved = 0;
    private int currentStreak = 0;
    private String lastActiveDate = "";
    private List<DailyRecord> dailyHistory = new ArrayList<>();

    public int getTotalSolved() { return totalSolved; }
    public void setTotalSolved(int totalSolved) { this.totalSolved = totalSolved; }
    public int getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(int currentStreak) { this.currentStreak = currentStreak; }
    public String getLastActiveDate() { return lastActiveDate; }
    public void setLastActiveDate(String lastActiveDate) { this.lastActiveDate = lastActiveDate; }
    public List<DailyRecord> getDailyHistory() { return dailyHistory; }
    public void setDailyHistory(List<DailyRecord> dailyHistory) { this.dailyHistory = dailyHistory; }
}
