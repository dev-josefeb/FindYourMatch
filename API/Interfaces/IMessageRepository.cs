﻿using API.DTOs;
using API.Entities;
using API.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);

        void DeleteMessage(Message message);

        Task<Message> GetMessage(int id);

        Task<PagedList<MessageDto>> GetMessagesForUser();

        Task<IEnumerable<MessageDto>> GetMessageThread(int currentId, int recipientId);

        Task<bool> SaveAllAsync();
    }
}
