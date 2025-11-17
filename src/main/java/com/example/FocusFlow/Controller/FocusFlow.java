package com.example.FocusFlow.Controller;

import com.example.FocusFlow.Dao.TaskDao;
import com.example.FocusFlow.Dto.Task;
import com.example.FocusFlow.Service.FocusFlowServiceTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.AbstractList;
import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/task")
public class FocusFlow  {

    @Autowired
    private FocusFlowServiceTask focusFlowTask;


    @PostMapping
    public ResponseEntity<TaskDao> focusFlowTask(@RequestBody Task task){

        TaskDao taskDao = new TaskDao();
        try{
            taskDao = focusFlowTask.insertATask(task);
            if(taskDao!=null){
                return new ResponseEntity<>(taskDao,HttpStatus.CREATED);
            }
        }
        catch (NullPointerException exception){
            throw new RuntimeException();
        }
    return new ResponseEntity<>(taskDao,HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TaskDao>> focusFlowGet(){
        List<TaskDao> allTask =  new ArrayList<>();
        try{
            allTask = focusFlowTask.retrieveAllTask();
            if(!allTask.isEmpty())
                return new ResponseEntity<>(allTask,HttpStatus.OK);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }
        return new ResponseEntity<>(allTask,HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDao> updateFocusFlowTask(@PathVariable(value = "id") Long taskId,@RequestBody Task task ){
        TaskDao taskDao = new TaskDao();
        try{
            taskDao = focusFlowTask.updateTheTask(taskId,task);
            if(taskDao!=null){
                return new ResponseEntity<>(taskDao,HttpStatus.CREATED);
            }
        }
        catch (NullPointerException exception){
            throw new RuntimeException();
        }
        return new ResponseEntity<>(taskDao,HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> updateFocusFlowTask(@PathVariable(value = "id") Long taskId){
       Boolean isDeleted =  focusFlowTask.removeTask(taskId);
       if(isDeleted)
           return new ResponseEntity<>("Task of Id : " + taskId + " is deleted" , HttpStatus.OK);
       else
           return new ResponseEntity<>("Task of Id : " + taskId + " not found" , HttpStatus.NOT_FOUND);
    }

    @GetMapping("/completed")
    public ResponseEntity<List<TaskDao>> getAllCompletedTask(){
        List<TaskDao> allTaskWhichAreCompleted =  new ArrayList<>();

        allTaskWhichAreCompleted = focusFlowTask.getTaskListCompleteAsTrue();
        if(!allTaskWhichAreCompleted.isEmpty())
            return new ResponseEntity<>(allTaskWhichAreCompleted,HttpStatus.OK);
        else
            return new ResponseEntity<>(allTaskWhichAreCompleted,HttpStatus.OK);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<TaskDao>> getAllPendingTask(){
        List<TaskDao> allTaskWhichAreCompleted =  new ArrayList<>();

        allTaskWhichAreCompleted = focusFlowTask.getTaskListCompleteAsFalse();
        if(!allTaskWhichAreCompleted.isEmpty())
            return new ResponseEntity<>(allTaskWhichAreCompleted,HttpStatus.OK);
        else
            return new ResponseEntity<>(allTaskWhichAreCompleted,HttpStatus.OK);
    }

    @DeleteMapping("all")
    public ResponseEntity<String> removeAllTask(){
        Boolean removedStatus = focusFlowTask.removeAllTask();
        if(removedStatus)
            return new ResponseEntity<>("all Task are deleted" , HttpStatus.OK);
        else
            return new ResponseEntity<>("either all task are already deleted or not able to delete" , HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
