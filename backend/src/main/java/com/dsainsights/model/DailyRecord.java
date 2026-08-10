package com.dsainsights.model;

public class DailyRecord {

    private String date;
    private int solved;

    public DailyRecord() {}

    public DailyRecord(String date, int solved) {
        this.date = date;
        this.solved = solved;
    }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public int getSolved() { return solved; }
    public void setSolved(int solved) { this.solved = solved; }
}
