--use Repro;
use mannen_dk_db;

create table AE_File
(
	AE_Job_FileID int not null primary key identity,
	AE_ShortID int,
	AE_Job_INorOUT varchar(255),
	AE_Job_Path varchar(255),
	CONSTRAINT UC_AE_File UNIQUE (AE_ShortID, AE_Job_INorOUT, AE_Job_Path)
);
