//本模块和产品相关
const pool = require("../pool");
const express = require("express");
let router = express.Router();

/*******轮播的数据*********/
router.get("/carousel",(req,res)=>{

        //if(!req.session.user_id){
        //    res.json({code:-2,msg:"请登录"});
        //    return;
        //}
        console.log("轮播");
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            var sql = "SELECT * FROM mi_index_carousel";
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    res.json({code:1,data:result});
                }else{
                    res.json({code:-1,msg:"记录不存在"});
                }
                conn.release();
            });
        });

    //res.send("uuu")
});

/*************产品列表的数据*************/
router.get("/list",(req,res)=>{
    let pno = req.query.pno;
    let kw = req.query.kw;
    if(!pno){
        pno = 1;
    }
    pno = parseInt(pno);
    //创建一个对象，保存所有用户需要数值
    let output= {
        pageSize:12,     //页面大小
        pageCount:0,    //总记录数
        pno:pno,        //当前页码
        data:[]         //当前记录
    };
    let process = 0;
    //查询总记录数
    pool.getConnection((err,conn)=>{
        if(err)throw err;
        var sql = "SELECT count(*) AS c FROM mi_laptop";
        conn.query(sql,(err,result)=>{
            if(err)throw err;
            //总记录数
            var count = result[0]["c"];
            //总页数
            output.pageCount =
                Math.ceil(count/output.pageSize);
            //释放连接
            conn.release();
            //判断当前执行顺序,
            process+=50;
            if(process==100){
                res.json(output);
            }
        });
    });
    //查询指定页号的内容
    pool.getConnection((err,conn)=>{
        if(err)throw err;
        var sql = "SELECT lid,title,price FROM mi_laptop " + (kw?"WHERE title LIKE '%kw%'":"") + " LIMIT ?,?";
        //sql += " (kw?"WHERE title LIKE '%kw%'":"")" ;
        //sql += " LIMIT ?,?";
        var offset = (output.pno-1)*output.pageSize;
        conn.query(sql,[offset,output.pageSize],(err,result)=>{
            if(!result){       //SQL语句执行失败
                res.json({"code":500, "msg":"db execute err"});
            }else {
                var count = result;
                console.log(1);
                //console.log(result)
                console.log(count);
                for(i=0; i<count; i++){
                    var lid = result[i]['lid'];
                    var sql = "SELECT md FROM mi_laptop_pic WHERE pid=lid LIMIT 0,1";
                    //$result = mysqli_query($conn, $sql);
                    result[i]['pic'] = result[0];
                }

                output.data = result;
                //console.log(output.data);


                conn.release();
                process+=50;
                if(process==100){
                    res.json(output);
                }
            }
        });
    });
});
router.get("/update",(req,res)=>{
    res.send("update")
});
router.get("/detail",(req,res)=>{
    res.send("detail")
});
router.get("/search",(req,res)=>{
    res.send("search")
});
module .exports = router;