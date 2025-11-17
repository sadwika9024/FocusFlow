package com.example.FocusFlow.Service;

import com.example.FocusFlow.Dao.TaskDao;
import com.example.FocusFlow.Dto.Task;
import com.example.FocusFlow.Repository.FocusFlowRepositoryTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FocusFlowServiceTask {

    @Autowired
    private FocusFlowRepositoryTask focusFlowRepositoryTask;

    public TaskDao insertATask(Task task){
        TaskDao taskDao = new TaskDao();
        taskDao.setTitle(task.getTitle());
        taskDao.setCompleted(task.getCompleted());
        return focusFlowRepositoryTask.save(taskDao);

    }


    public List<TaskDao> retrieveAllTask(){
        return focusFlowRepositoryTask.findAll();
    }

    public TaskDao updateTheTask(Long id,Task task){
        TaskDao taskDao = new TaskDao();
        taskDao.setId(id);
        taskDao.setTitle(task.getTitle());
        taskDao.setCompleted(task.getCompleted());

        return focusFlowRepositoryTask.save(taskDao);
    }

    public Boolean removeTask(Long id){
        if(focusFlowRepositoryTask.existsById(id)) {
            focusFlowRepositoryTask.deleteById(id);
            return true;
        }

        return false;
    }
    public List<TaskDao> getTaskListCompleteAsTrue(){
        return focusFlowRepositoryTask.findByCompletedTrue();
    }

    public List<TaskDao> getTaskListCompleteAsFalse(){
        return focusFlowRepositoryTask.getTaskListCompleteAsFalse(Boolean.FALSE);
    }

    public Boolean removeAllTask(){
        if(focusFlowRepositoryTask.count() > 0){
            focusFlowRepositoryTask.deleteAll();
            return Boolean.TRUE;
        }
        else
            return Boolean.FALSE;

    }
}
