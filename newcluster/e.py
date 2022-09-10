def test():
    import pandas as pd
    import numpy as np
    import pickle
    profile = pd.read_csv('clusterign\\xavier_profile.csv')
    test =  pd.read_csv('clusterign\\final\\f.csv')
    test = test.iloc[1: , :]
    test.dropna()
    test.interval = test.interval.abs()
    test['key_hold_duration'] = test['key_hold_duration'].str[:-3]
    test['key_hold_duration'] = test['key_hold_duration'].astype('int')
    average = profile.groupby('clusters').mean().reset_index()
    kmeans = pickle.load(open("xav.pkl", "rb"))
    X = test.drop(['words'],axis=1)
    clusters = kmeans.predict(X)
    test['clusters'] = clusters
    pk = []
    pi = []
    for index, row in test.iterrows():
        av = average[average['clusters'] == int(row['clusters'])]
        to_add = row['key_hold_duration']/av['key_hold_duration'].values[0]
        pk.append(to_add)
        to_add = row['interval']/av['interval'].values[0]
        pi.append(to_add)
    test['PrecentageKEY'] = pk
    test['PrecentageINT'] = pi

    #remove words from test not in profile
    ut = test.words.unique()
    up = profile.words.unique()
    for i in ut:
        if not(i in up):
            test = test[test['words'] != i]

    #count clusters from test
    dic = {}
    for index, row in profile.iterrows():
        cp = str(int(row['words'])) + 'cp'
        cn = str(int(row['words'])) + 'cn'
        dic[cp] = 0
        dic[cn] = 0
    for index, row in test.iterrows():
        clu = profile[profile['words']==row['words']]
        if not(clu['clusters'].values[0] == row['clusters']):
            cn = str(int(row['words'])) + 'cn'
            countnow = dic[cn]
            countnow += 1
            dic[cn] = countnow
        else:
            cp = str(int(row['words'])) + 'cp'
            countnow = dic[cp]
            countnow += 1
            dic[cp] = countnow

    #create precentages
    dicn = {}
    vaal = []
    done = 1
    per = []
    for key in dic:
        if done:
            val = str(key)
            if val[-1] == 'n':
                val = val.replace('cn','')
            else:
                val = val.replace('cp','')
            val = int(val)
            vaal.append(val)
            neg = dic[key]
            done = 0
        else:
            pos = dic[key]
            pre = pos/(pos+neg)
            per.append(pre)
            done = 1
    to_add = dict(zip(vaal, per))
    profile['Percentages'] = profile['words'].map(to_add)
print(test())