CREATE PROCEDURE CreateAE_Job_Task
  @AE_JobID varchar(100),
  @TaskName varchar(255),
  @TicketName varchar(255),
  @TaskTitle varchar(255),
  @Task_ShortID int,
  @Task_Parameters varchar(255),
  @Task_Operator varchar(255),
  @Task_Server varchar(100),
  @Task_JobFolder varchar(255),
  @Task_Priority varchar(20),
  @Task_StartTime datetime,
  @Task_EndTime datetime,
  @Task_Status varchar(20),
  @Task_WorkflowStatus varchar(20)
AS
BEGIN
  INSERT INTO AE_Job_Task (AE_JobID, TaskName, TicketName, TaskTitle, Task_ShortID, Task_Parameters,
    Task_Operator, Task_Server, Task_JobFolder, Task_Priority, Task_StartTime, Task_EndTime, Task_Status, Task_WorkflowStatus)
    VALUES (@AE_JobID,@TaskName,@TicketName,@TaskTitle,@Task_ShortID,@Task_Parameters,@Task_Operator,@Task_Server,
    @Task_JobFolder,@Task_Priority,@Task_StartTime,@Task_EndTime,@Task_Status,@Task_WorkflowStatus)
END
