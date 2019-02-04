CREATE PROCEDURE CreateAE_File
	@AE_ShortID int,
	@AE_Job_INorOUT varchar(255),
	@AE_Job_Path varchar(255)
AS
BEGIN
  INSERT INTO AE_File (AE_ShortID, AE_Job_INorOUT, AE_Job_Path) VALUES (@AE_ShortID,@AE_Job_INorOUT,@AE_Job_Path)
END
