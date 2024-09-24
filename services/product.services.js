const Product = require('../model/product.model');

class ProductServices {
    async createProduct(body){
        return await Product.create(body);
    };
    async getProduct(body){
        return await Product.findOne(body);
    };
    async getAllProduct(query) {
        // Pagination
        let pageNo = parseInt(query.pageNo) || 1;
        let perPage = parseInt(query.perPage) || 50;
        let skip = (pageNo - 1) * perPage;
    
        // Sorting
        let sortConditions = {
            title: 1,
        };
    
        if (query.sortBy) {
            sortConditions = {};
            sortConditions[query.sortBy] = query.sortOrder === 'desc' ? -1 : 1;
        }
    
        // Searching
        let search =  query.search ? [
            {
                $match:{
                    $or: [
                        {
                            title: {
                                $regex: query.search.trim().replace(/\s+/g, " "),
                                $options: "i",
                            }
                        },
                        {
                            description: {
                                $regex: query.search.trim().replace(/\s+/g, " "),
                                $options: "i",
                            }
                        },
                        {
                            price: Number(query.search)
                        },
                    ]
                }
            }
        ] : [];
    
        let find = [
          {
            $match: { isDelete: false },
          },
          ...search,
          {
            $sort: sortConditions
          }
        ];
        let totalCount = await Product.aggregate([...find]);
        let result = await Product.aggregate([
          ...find,
          {
            $skip: skip,
          },
          {
            $limit: perPage,
          },
        ]);
        let totalPage = Math.ceil(totalCount.length / perPage);
        return {
          totalCount: totalCount.length,
          totalPage,
          currentPage: pageNo,
          result
        };
      }
};
module.exports = ProductServices;