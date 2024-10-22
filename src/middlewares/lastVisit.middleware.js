
export const setLastVisit =(req, res, next) =>{
    // 1. if cookie is set, then add a local variable with last visit time and date
    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    res.cookie('lastVisit', new Date().toISOString(),{
        maxAge: 2*60 * 60 * 24 * 1000 // 1 day
    });
    next();
};