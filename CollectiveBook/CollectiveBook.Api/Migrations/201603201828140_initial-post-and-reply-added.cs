namespace CollectiveBook.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initialpostandreplyadded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Post",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PostContent = c.String(nullable: false),
                        CreatedBy = c.String(nullable: false),
                        Created = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Reply",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ReplyContent = c.String(nullable: false),
                        CreatedBy = c.String(nullable: false),
                        Created = c.DateTime(nullable: false),
                        PostId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Post", t => t.PostId, cascadeDelete: true)
                .Index(t => t.PostId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Reply", "PostId", "dbo.Post");
            DropIndex("dbo.Reply", new[] { "PostId" });
            DropTable("dbo.Reply");
            DropTable("dbo.Post");
        }
    }
}
