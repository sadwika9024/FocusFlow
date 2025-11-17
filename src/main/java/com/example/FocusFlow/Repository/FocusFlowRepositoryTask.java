package com.example.FocusFlow.Repository;

import com.example.FocusFlow.Dao.TaskDao;
import com.example.FocusFlow.Dto.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FocusFlowRepositoryTask extends JpaRepository<TaskDao, Long> {

    public List<TaskDao> findByCompletedTrue();


    @Query("SELECT t FROM TaskDao t WHERE t.completed = :status")
    public List<TaskDao> getTaskListCompleteAsFalse(@Param("status")Boolean status);


}
