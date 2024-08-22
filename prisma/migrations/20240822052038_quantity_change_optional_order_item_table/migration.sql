BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[OrderItem] ALTER COLUMN [quantity] INT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
