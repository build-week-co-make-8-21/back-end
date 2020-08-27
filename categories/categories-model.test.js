const db = require('../data/db-config.js');
const Categories = require('./categories-model.js');

describe('categories model', () => {
    describe('insert', () => {

        beforeEach(async () => {
            await db('categories').truncate();
        });

        it('should insert the provided category into the db', async () => {
            await Categories.add({ categoryId: 1, categoryName: 'test'});
            await Categories.add({ categoryId: 2, categoryName: 'test2'});

            const categories = await db('categories');
            expect(categories).toHaveLength(2);
        })

        it('should return the category we inserted', async () => {
            let category = await Categories.add({ categoryName: 'goofy'});
            expect(category.categoryName).toBe('goofy')
        })
    })
})