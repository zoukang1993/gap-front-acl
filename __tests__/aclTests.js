import {Acl} from '../lib/acl';

test('acl', () => {
    let acl = new Acl();
    acl.allow('admin', ['listSpu']);
    
    expect(acl.isAllowed(['admin'], 'listSpu')).toBe(false);
    expect(acl.isAllowed(['admin'], 'listApp')).toBe(false);
    
    acl.forbid('admin', ['listSpu']);
    expect(acl.isAllowed(['admin'], 'listSpu')).toBe(false);
    expect(acl.isAllowed(['admin'], 'listApp')).toBe(false);
});
