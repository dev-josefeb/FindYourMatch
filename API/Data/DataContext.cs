using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }

        public DbSet<UserLike> Likes { get; set; }

        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserLike>()
                .HasKey(key => new { key.SourceUserId, key.LikedUserId });

            builder.Entity<UserLike>()
                .HasOne(source => source.SourceUser)
                .WithMany(liked => liked.LikedUsers)
                .HasForeignKey(source => source.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserLike>()
                .HasOne(source => source.LikedUser)
                .WithMany(liked => liked.LikedByUsers)
                .HasForeignKey(source => source.LikedUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Message>()
                .HasOne(message => message.Recipient)
                .WithMany(message => message.MessagesRecieved)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(message => message.Sender)
                .WithMany(message => message.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}