HSET "weibo_tools_acount:"
        acountname : {"accountName":accountName,  "password":password, "ownedWeibo":{ownedWeibo:"true"}, "key": key}


HSET "weibo_users:"
        weibo_user.name : weibo_user


HSET "weibo_tools_postlist:"
        post.id : post

lpush "postlist_" + weibo_user_name:
        [post.id]