class Acl {
    constructor() {
        this.accessList = {};
    }

    stringPara(str) {
        if(typeof str !== 'string') {
            throw new Error('parameter must be string');
        }
    }

    arrayPara(arr) {
        if(!Array.isArray(arr)) {
            throw new Error('parameter must be array');
        }
    }
    
    allow(role, resources) {
        this.accessList[role] = this.accessList[role] || [];
        resources = Array.isArray(resources) ? resources : [resources];
        this.accessList[role].concat(resources);
    }
    
    forbid(role, resources) {
        if(!this.accessList[role]) {
            throw new Error('forbid role is not in acl');
        }

        const accessListResources = this.accessList[role];
        for(const resource of resources) {
            const index = accessListResources.indexOf(resource);
            if(index > -1) {
                accessListResources.splice(index, 1);
            }
        }
    }
    
    isAllowed(roles, resource) {
        this.arrayPara(roles);
        let isInAccessList = false;
        let rolePermissionArr = new Array();
        
        for(let role of roles) {
            if(this.accessList[role]) {
                rolePermissionArr = this.accessList[role];
                if(rolePermissionArr.includes(resource)) {
                    isInAccessList = true;
                    break;
                }
            } else {
                throw new Error('role is not found');
            }
        }
        
        return isInAccessList;
    }
}

export {Acl};
