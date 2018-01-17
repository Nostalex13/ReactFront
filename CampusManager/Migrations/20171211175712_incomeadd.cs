using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CampusManager.Migrations
{
    public partial class incomeadd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Incomes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    AddDate = table.Column<DateTime>(type: "timestamp", nullable: false),
                    ClearIncome = table.Column<double>(type: "float8", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    OwnedUserId = table.Column<string>(type: "text", nullable: true),
                    Sum = table.Column<double>(type: "float8", nullable: false),
                    Tax = table.Column<int>(type: "int4", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incomes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Incomes_Users_OwnedUserId",
                        column: x => x.OwnedUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_OwnedUserId",
                table: "Incomes",
                column: "OwnedUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Incomes");
        }
    }
}
