using API.DTOs;
using API.Entities;
using AutoMapper;
using System.Linq;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(destination => destination.PhotoUrl, options => options
                .MapFrom(src => src.Photos.FirstOrDefault(photo => photo.IsMain).Url));

            CreateMap<Photo, PhotoDto>();
        }
    }
}
