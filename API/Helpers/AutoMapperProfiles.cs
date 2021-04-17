using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using System;
using System.Linq;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(destination => destination.PhotoUrl, options => options
                .MapFrom(src => src.Photos.FirstOrDefault(photo => photo.IsMain).Url))
                .ForMember(destination => destination.Age, options => options
                .MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Photo, PhotoDto>();

            CreateMap<MemberUpdateDto, AppUser>();

            CreateMap<RegisterDto, AppUser>();

            CreateMap<Message, MessageDto>()
                .ForMember(destination => destination.SenderPhotoUrl, options => options
                .MapFrom(src => src.Sender.Photos.FirstOrDefault(photo => photo.IsMain).Url))
                .ForMember(destination => destination.RecipientPhotoUrl, options => options
                .MapFrom(src => src.Recipient.Photos.FirstOrDefault(photo => photo.IsMain).Url));
        }
    }
}