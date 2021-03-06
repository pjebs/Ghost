const Promise = require('bluebird');
const common = require('../../lib/common');
const models = require('../../models');
const ALLOWED_INCLUDES = ['count.posts'];

module.exports = {
    docName: 'authors',

    browse: {
        options: [
            'include',
            'filter',
            'fields',
            'limit',
            'status',
            'order',
            'page'
        ],
        validation: {
            options: {
                include: {
                    values: ALLOWED_INCLUDES
                }
            }
        },
        permissions: true,
        query(frame) {
            return models.User.findPage(frame.options);
        }
    },

    read: {
        options: [
            'include',
            'filter',
            'fields'
        ],
        data: [
            'id',
            'slug',
            'status',
            'email',
            'role'
        ],
        validation: {
            options: {
                include: {
                    values: ALLOWED_INCLUDES
                }
            }
        },
        permissions: true,
        query(frame) {
            return models.User.findOne(frame.data, frame.options)
                .then((model) => {
                    if (!model) {
                        return Promise.reject(new common.errors.NotFoundError({
                            message: common.i18n.t('errors.api.authors.notFound')
                        }));
                    }

                    return model;
                });
        }
    }
};
