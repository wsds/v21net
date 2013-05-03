HSET "weibo_tools_accounts:"
        acountname : {"accountID":acountID, "accountName":accountName,  "password":password, "ownedWeibo":{ownedWeibo:"true"}, "key": key}


HSET "weibo_users:"
        weibo_user.name : weibo_user


HSET "weibo_tools_postlist:"
        post.id : post

HSET "publishing:"
        post.id : {"previous" : post.id, "next" : post.id, "publishTime": post.publishTime,"weibo_user": post.weibo_user,  "text": post.text}

LPUSH  "postlist_" + weibo_user_name:
        [post.id]

LPUSH  "forwardlist_" + weibo_user_name:
        [post.id]

SET "publishing_next_post_id"
        post.id || "empty"