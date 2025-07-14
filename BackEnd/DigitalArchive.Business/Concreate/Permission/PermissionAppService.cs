﻿using DigitalArchive.Business.Abstract;
using DigitalArchive.Business.ValidationRules.FluentValidation.Permission;
using DigitalArchive.Core.Aspects.AutoFac.Authorize;
using DigitalArchive.Core.Aspects.AutoFac.Validation;
using DigitalArchive.Core.Authorization;
using DigitalArchive.Core.DbModels;
using DigitalArchive.Core.Dto.Response;
using DigitalArchive.Core.Extensions.Linq;
using DigitalArchive.Core.Extensions.ResponseAndExceptionMiddleware;
using DigitalArchive.Core.Repositories;
using DigitalArchive.Entities.ViewModels.CategoryVM;
using DigitalArchive.Entities.ViewModels.PermissionVM;
using DigitalArchive.Entities.ViewModels.UserPermissionVM;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace DigitalArchive.Business.Concreate
{
    public class PermissionAppService : BaseAppService, IPermissionAppService
    {
        private readonly IRepository<Permission, int> _permissionRepository;
        private readonly IRepository<PermissionGroup, int> _permissionGroupRepository;
        public PermissionAppService
            (
            IRepository<Permission, int> permissionRepository,
            IRepository<PermissionGroup, int> permissionGroupRepository
            )
        {
            _permissionRepository = permissionRepository;
            _permissionGroupRepository = permissionGroupRepository;
        }

        //[AuthorizeAspect(new string[] { AllPermissions.Permission_List })]
        public async Task<PagedResult<GetAllPermissionInfo>> GetAllPermissionByPage(GetAllPermissionInput input)
        {
            var query = from permission in _permissionRepository.GetAll()
                        join permissionGroup in _permissionGroupRepository.GetAll()
                        on permission.PermissionGroupId equals permissionGroup.Id
                        where !permission.IsDeleted && !permissionGroup.IsDeleted
                        select new GetAllPermissionInfo
                        {
                            Id = permission.Id,
                            Name = permission.Name,
                            Description = permission.Description,
                            PermissionGroupId = permissionGroup.Id,
                            PermissionGroupName = permissionGroup.Name,
                        };

            query = query.WhereIf(!string.IsNullOrEmpty(input.SearchText), x => x.Name.Contains(input.SearchText));

            var totalPermissionCount = await query.CountAsync();

            var permissions = await query.PageBy(input.SkipCount, input.MaxResultCount).ToListAsync();

            return new PagedResult<GetAllPermissionInfo>(totalPermissionCount, permissions);

        }

        //[AuthorizeAspect(new string[] { AllPermissions.Permission_List })]
        public async Task<ListResult<GetAllPermissionInfo>> GetPermissionList()
        {
            //var query =await _permissionRepository.GetAll().Where(x=>!x.IsDeleted).ToListAsync();
            var query = from permission in _permissionRepository.GetAll()
                        join permissionGroup in _permissionGroupRepository.GetAll()
                        on permission.PermissionGroupId equals permissionGroup.Id
                        where !permission.IsDeleted && !permissionGroup.IsDeleted
                        select new GetAllPermissionInfo
                        {
                            Id = permission.Id,
                            Name = permission.Name,
                            Description = permission.Description,
                            PermissionGroupId = permissionGroup.Id,
                            PermissionGroupName = permissionGroup.Name,
                            PermissionGroupDescription = permissionGroup.Description,
                        };

            var permissions = await query.ToListAsync();
            var mappedPermissions = Mapper.Map<List<GetAllPermissionInfo>>(permissions);

            return new ListResult<GetAllPermissionInfo>(mappedPermissions);
        }

        public async Task<ListResult<GetAllPermissionInfoByGroup>> GetPermissionListByGroup()
        {
            List<GetAllPermissionInfoByGroup> result = new List<GetAllPermissionInfoByGroup>();
            var permissionGroupList = await _permissionGroupRepository.GetAll().Where(x => !x.IsDeleted).ToListAsync();

            foreach (var item in permissionGroupList)
            {
                var resultItem = new GetAllPermissionInfoByGroup();
                resultItem.PermissionList = new List<PermissionDto>();
                var permissionList = await _permissionRepository.GetAll().Where(x => !x.IsDeleted && x.PermissionGroupId == item.Id).ToListAsync();
                resultItem.PermissionGroupId = item.Id;
                resultItem.PermissionName = item.Name;
                resultItem.PermissionGroupDescription = item.Description;

                foreach (var childItem in permissionList)
                {
                    resultItem.PermissionList.Add(new PermissionDto
                    {
                        PermissionId = childItem.Id,
                        PermissionName = childItem.Name,
                        PermissionDescription = childItem.Description,
                    });
                }
                result.Add(resultItem);
            }
            return new ListResult<GetAllPermissionInfoByGroup>(result);
        }

        public async Task<GetAllPermissionInfo> GetPermissionById(int permissionId)
        {
            var permission = await _permissionRepository.FirstOrDefaultAsync(x => x.Id == permissionId && !x.IsDeleted);
            if (permission == null)
            {
                throw new ApiException($"{permissionId} nolu Id degeri bulunamadı");
            }
            var mappedPermission = Mapper.Map<GetAllPermissionInfo>(permission);
            return mappedPermission;
        }

        [AuthorizeAspect(new string[] { AllPermissions.Permission_Create })]
        [ValidationAspect(typeof(CreatePermissionInputValidator))]
        public async Task CreatePermission(CreatePermissionInput input)
        {
            var permissionName = await _permissionRepository.FirstOrDefaultAsync(x => x.Name == input.Name && x.IsDeleted == false);
            if (permissionName != null)
            {
                throw new ApiException("hata kayıtlı oge zaten var");
            }

            var newPermission = Mapper.Map<Permission>(input);
            await _permissionRepository.InsertAsync(newPermission);
        }

        [AuthorizeAspect(new string[] { AllPermissions.Permission_Update })]
        [ValidationAspect(typeof(UpdatePermissionInputValidator))]
        public async Task UpdatePermission(UpdatePermissionInput input)
        {

            var checkPermission = await _permissionRepository.GetAsync(input.Id);
            if (checkPermission == null)
            {
                throw new ApiException($"{input.Id} nolu Id degeri bulunamadı");
            }

            var permission = await _permissionRepository.FirstOrDefaultAsync(x => x.Name == input.Name && x.IsDeleted == false);
            if (permission != null)
            {
                if (permission.Id != checkPermission.Id)
                {
                    throw new ApiException("Aynı isimle aktif permission oldugu icin guncellenemedi. ");
                }
            }
            Mapper.Map(input, checkPermission);
            await _permissionRepository.UpdateAsync(checkPermission);
        }

        [AuthorizeAspect(new string[] { AllPermissions.Permission_Delete })]
        public async Task DeletePermission(int permissionId)
        {
            var checkPermission = await _permissionRepository.GetAsync(permissionId);
            if (checkPermission == null)
            {
                throw new ApiException($"{permissionId} nolu Id degeri bulunamadı");
            }
            await _permissionRepository.DeleteAsync(permissionId);


        }
    }
}
