using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CampusManager.Migrations
{
    public partial class incomerelationchange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Incomes_Users_OwnedUserId",
                table: "Incomes");

            migrationBuilder.DropIndex(
                name: "IX_Incomes_OwnedUserId",
                table: "Incomes");

            migrationBuilder.AddColumn<string>(
                name: "OwnedUserName",
                table: "Incomes",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnedUserName",
                table: "Incomes");

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_OwnedUserId",
                table: "Incomes",
                column: "OwnedUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Incomes_Users_OwnedUserId",
                table: "Incomes",
                column: "OwnedUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
