package com.example.FocusFlow.Dto;

import lombok.Data;
import lombok.Getter;
import org.springframework.stereotype.Component;

@Component
@Data
@Getter
public class Task {
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    private  String title;
    private Boolean completed;

}
