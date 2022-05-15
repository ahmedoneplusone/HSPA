using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HSPA_API.Migrations
{
    public partial class AddPasswordEncryotion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn("Password", "Users");
            migrationBuilder.AddColumn<byte[]>(
                name: "Password",
                table: "Users",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: "pass@123"
 );

            migrationBuilder.AddColumn<byte[]>(
                name: "Passwordkey",
                table: "Users",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Passwordkey",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                                defaultValue: "pass@123"

);
        }
    }
}
