def test():
    import pandas as pd
    import numpy as np
    from sklearn.cluster import KMeans
    import warnings
    warnings.filterwarnings('ignore')
    train1 = pd.read_csv('./train1.csv')
    train2 = pd.read_csv('./train2.csv')
    train3 = pd.read_csv('./train3.csv')
    test1 = pd.read_csv('./test1.csv')
    test2 = pd.read_csv('./test2.csv')
            
    def data_cleaner(df):
        # create 2 copies to reshape the data
        df1 = df.copy()
        df2 = df.copy()

        # drop interval column in df1, key hold duration in df2
        df1.drop(['interval'], axis=1, inplace=True)
        df1.drop(['key_hold_duration'], axis=1, inplace=True)
        df2.drop(['key_hold_duration'], axis=1, inplace=True)

        # drop first row in df1 and last row in df2
        df1 = df1.drop(df1.index[-1]).reset_index(drop=True)
        df2 = df2.drop(df2.index[0]).reset_index(drop=True)

        # rename the columns 
        df1.columns = ['word1']
        df2.columns = ['word2', 'interval']

        # change interval to integer
        df2['interval'] = abs(df2['interval'].astype(int))

        # merge the two dataframes
        df3 = pd.merge(df1, df2, left_index=True, right_index=True)
        df3['word_combo'] = df3['word1'].astype(str) + ',' + df3['word2'].astype(str)
        df3.drop(['word1', 'word2'], axis=1, inplace=True)
        df4 = df3.copy()

        # if multiple of same word combo exists take the average interval
        df4 = df4.groupby('word_combo').mean().reset_index()

        return(df4)
    final_train1 = data_cleaner(train1)
    final_train2 = data_cleaner(train2)
    final_train3 = data_cleaner(train3)
    final_test1 = data_cleaner(test1)
    final_test2 = data_cleaner(test2)
    final_train = pd.concat([final_train1, final_train2, final_train3], ignore_index=True)
    final_train = final_train.groupby('word_combo').mean().reset_index()
    final_test = pd.concat([final_test1, final_test2], ignore_index=True)
    final_test = final_test.groupby('word_combo').mean().reset_index()
    kmeans_train = KMeans(n_clusters=3, random_state=0).fit(final_train[['interval']])
    final_train['cluster'] = kmeans_train.labels_
    train_centroids = kmeans_train.cluster_centers_
    kmeans_test = KMeans(n_clusters=3, random_state=0, init=train_centroids).fit(final_test[['interval']])
    final_test['cluster'] = kmeans_test.labels_
    train_centroids = kmeans_test.cluster_centers_
    final = pd.merge(final_train, final_test, on='word_combo', how='inner')
    correct = 0
    for i in range(len(final)):
        if final['cluster_x'][i] == final['cluster_y'][i]:
            correct += 1

    return(correct / len(final))
print(test()*100)