import sys
import codecs
import re
import json
import urllib2
import hashlib
import random

def convertLine(line):
    
    p = re.compile(ur'(?P<ip>[^ ]+) .+ (?P<date>\[[^]]+\]) (?P<request>"[^"]+") (?P<statuscode>\d+) (?P<length>\d+)', re.MULTILINE | re.IGNORECASE)
    m = p.search(line)

    geoip_url = 'http://localhost:8080/json/%s' % m.group('ip')
    geoip_data = json.load(urllib2.urlopen(geoip_url))

    return m.group('ip'), geoip_data['region_name'], geoip_data['country_code'], str(geoip_data['latitude']), str(geoip_data['longitude']), m.group('date'), m.group('request'), m.group('statuscode'), m.group('length')


def convert_file(file):
    with codecs.open(file, encoding='utf8') as i:
        with codecs.open(file+'.converted', 'a+', encoding='utf8') as o:
            for line in i:
                try:
                    c = '\t'.join(convertLine(line))
                    o.write(c)
                    o.write('\n')
                except:
                    pass


if __name__ == "__main__":
    convert_file(sys.argv[1])