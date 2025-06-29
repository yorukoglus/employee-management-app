import {confirmations} from '../pages/shared/utils.js';
import {assert} from '@open-wc/testing';
import sinon from 'sinon';

suite('utils', () => {
  let windowConfirmStub;

  setup(() => {
    windowConfirmStub = sinon.stub();

    // Mock window.confirm
    window.confirm = windowConfirmStub;
  });

  teardown(() => {
    delete window.confirm;
  });

  suite('confirmations', () => {
    test('deleteEmployee shows confirmation dialog', () => {
      const employee = {
        firstName: 'John',
        lastName: 'Doe',
      };

      windowConfirmStub.returns(true);

      const result = confirmations.deleteEmployee(employee);

      assert.isTrue(windowConfirmStub.called);
      assert.isTrue(result);
    });

    test('deleteEmployee returns false when user cancels', () => {
      const employee = {
        firstName: 'John',
        lastName: 'Doe',
      };

      windowConfirmStub.returns(false);

      const result = confirmations.deleteEmployee(employee);

      assert.isTrue(windowConfirmStub.called);
      assert.isFalse(result);
    });

    test('updateEmployee shows confirmation dialog', () => {
      windowConfirmStub.returns(true);

      const result = confirmations.updateEmployee();

      assert.isTrue(windowConfirmStub.called);
      assert.isTrue(result);
    });

    test('updateEmployee returns false when user cancels', () => {
      windowConfirmStub.returns(false);

      const result = confirmations.updateEmployee();

      assert.isTrue(windowConfirmStub.called);
      assert.isFalse(result);
    });
  });
});
