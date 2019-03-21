CREATE PROCEDURE SP_GetAll
AS
BEGIN
    select * from AE_Job
    select * from AE_Job_Task
    select * from AE_File
END