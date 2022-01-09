import express from "express";
import Article from "../model/aritcle.model";

type NewArticle = {
    title: string;
    description: string;
    image: string;
    location: string;
    price: number;
    isAdjustable: boolean;
};

const router = express.Router();


router.post("/articles", async (req, res) => {
    const NewArticle: NewArticle = req.body as NewArticle;
    if (!NewArticle) {
        return res.status(400).json();
    }

    const article = await Article.create({
        title: NewArticle.title,
        description: NewArticle.description,
        image: NewArticle.image,
        location: NewArticle.location,
        price: NewArticle.price,
        isAdjustable: NewArticle.isAdjustable,

    });

    return res.status(201).json({
        id: article.id,
    });
});

router.get("/articles", async (req, res) => {

    const { location } = req.query;
    if (location == null) {

        return res.status(200).json(await Article.findAll());
    }
    const articles = await Article.findAll({
        where: {
            location: location,
        }
    });

    return res.status(200).json(articles);
});

router.get("/articles/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json();
    }
    const articles = await Article.findOne({
        where: {
            id,
        }
    });
    if (!articles) {
        return res.status(404).json();
    }
    return res.status(200).json(articles);
});


//test
export default router;