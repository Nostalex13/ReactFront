﻿// <auto-generated />
using CampusManager.DbData;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace CampusManager.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20171212133451_incomerelationchange")]
    partial class incomerelationchange
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452");

            modelBuilder.Entity("CampusManager.Models.Income", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("AddDate");

                    b.Property<double>("ClearIncome");

                    b.Property<string>("Description");

                    b.Property<string>("OwnedUserId");

                    b.Property<string>("OwnedUserName");

                    b.Property<double>("Sum");

                    b.Property<int>("Tax");

                    b.HasKey("Id");

                    b.ToTable("Incomes");
                });

            modelBuilder.Entity("CampusManager.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.Property<string>("Role");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
