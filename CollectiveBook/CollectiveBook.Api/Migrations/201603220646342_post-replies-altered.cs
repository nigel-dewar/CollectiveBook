namespace CollectiveBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class postrepliesaltered : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Reply", "PostId", "dbo.Post");
            AddColumn("dbo.Post", "PersonId", c => c.Int(nullable: false));
            AddColumn("dbo.Reply", "PersonId", c => c.Int(nullable: false));
            CreateIndex("dbo.Post", "PersonId");
            CreateIndex("dbo.Reply", "PersonId");
            AddForeignKey("dbo.Post", "PersonId", "dbo.Person", "Id");
            AddForeignKey("dbo.Reply", "PersonId", "dbo.Person", "Id");
            AddForeignKey("dbo.Reply", "PostId", "dbo.Post", "Id");
            DropColumn("dbo.Post", "CreatedBy");
            DropColumn("dbo.Reply", "CreatedBy");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Reply", "CreatedBy", c => c.String(nullable: false));
            AddColumn("dbo.Post", "CreatedBy", c => c.String(nullable: false));
            DropForeignKey("dbo.Reply", "PostId", "dbo.Post");
            DropForeignKey("dbo.Reply", "PersonId", "dbo.Person");
            DropForeignKey("dbo.Post", "PersonId", "dbo.Person");
            DropIndex("dbo.Reply", new[] { "PersonId" });
            DropIndex("dbo.Post", new[] { "PersonId" });
            DropColumn("dbo.Reply", "PersonId");
            DropColumn("dbo.Post", "PersonId");
            AddForeignKey("dbo.Reply", "PostId", "dbo.Post", "Id", cascadeDelete: true);
        }
    }
}
